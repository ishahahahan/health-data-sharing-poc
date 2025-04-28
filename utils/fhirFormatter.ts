// Utility functions for formatting health data to FHIR standard

export interface HealthDataPoint {
    value?: number;
    systolic?: number;
    diastolic?: number;
    hours?: number;
    minutes?: number;
    quality?: string;
    timestamp: string;
    unit?: string;
  }
  
  export interface FHIRResource {
    resourceType: string;
    id?: string;
    status: string;
    code: {
      coding: {
        system: string;
        code: string;
        display: string;
      }[];
    };
    subject: {
      reference: string;
    };
    effectiveDateTime: string;
    [key: string]: any;
  }
  
  // Convert health data to FHIR Observation resources
  export const convertToFHIR = (
    dataType: string,
    data: HealthDataPoint
  ): FHIRResource => {
    // Base FHIR resource structure
    const resource: FHIRResource = {
      resourceType: 'Observation',
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: getLoincCode(dataType),
            display: getDisplayName(dataType),
          },
        ],
      },
      subject: {
        reference: 'Patient/example', // In a real app, this would be the actual patient ID
      },
      effectiveDateTime: data.timestamp,
    };
  
    // Add value based on data type
    switch (dataType) {
      case 'steps':
        resource.valueQuantity = {
          value: data.value,
          unit: 'steps',
          system: 'http://unitsofmeasure.org',
          code: 'steps',
        };
        break;
      case 'heartRate':
        resource.valueQuantity = {
          value: data.value,
          unit: 'beats/minute',
          system: 'http://unitsofmeasure.org',
          code: '/min',
        };
        break;
      case 'sleep':
        // Convert hours and minutes to total minutes for FHIR
        const totalMinutes = (data.hours || 0) * 60 + (data.minutes || 0);
        resource.valueQuantity = {
          value: totalMinutes,
          unit: 'min',
          system: 'http://unitsofmeasure.org',
          code: 'min',
        };
        // Add sleep quality as a component if available
        if (data.quality) {
          resource.component = [
            {
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '248254009',
                    display: 'Sleep quality',
                  },
                ],
              },
              valueString: data.quality,
            },
          ];
        }
        break;
      case 'bloodPressure':
        // Blood pressure has systolic and diastolic components
        resource.component = [
          {
            code: {
              coding: [
                {
                  system: 'http://loinc.org',
                  code: '8480-6',
                  display: 'Systolic blood pressure',
                },
              ],
            },
            valueQuantity: {
              value: data.systolic,
              unit: 'mmHg',
              system: 'http://unitsofmeasure.org',
              code: 'mm[Hg]',
            },
          },
          {
            code: {
              coding: [
                {
                  system: 'http://loinc.org',
                  code: '8462-4',
                  display: 'Diastolic blood pressure',
                },
              ],
            },
            valueQuantity: {
              value: data.diastolic,
              unit: 'mmHg',
              system: 'http://unitsofmeasure.org',
              code: 'mm[Hg]',
            },
          },
        ];
        break;
      case 'weight':
        resource.valueQuantity = {
          value: data.value,
          unit: data.unit || 'kg',
          system: 'http://unitsofmeasure.org',
          code: data.unit === 'lb' ? '[lb_av]' : 'kg',
        };
        break;
      case 'bloodGlucose':
        resource.valueQuantity = {
          value: data.value,
          unit: data.unit || 'mg/dL',
          system: 'http://unitsofmeasure.org',
          code: data.unit === 'mmol/L' ? 'mmol/L' : 'mg/dL',
        };
        break;
      default:
        // Generic handling for other data types
        if (data.value !== undefined) {
          resource.valueQuantity = {
            value: data.value,
            unit: data.unit || 'unit',
            system: 'http://unitsofmeasure.org',
            code: data.unit || 'unit',
          };
        }
    }
  
    return resource;
  };
  
  // Helper functions to get standard codes
  const getLoincCode = (dataType: string): string => {
    switch (dataType) {
      case 'steps':
        return '41950-7'; // Number of steps in 24 hour Measured
      case 'heartRate':
        return '8867-4'; // Heart rate
      case 'sleep':
        return '93832-4'; // Sleep duration
      case 'bloodPressure':
        return '85354-9'; // Blood pressure panel
      case 'weight':
        return '29463-7'; // Body weight
      case 'bloodGlucose':
        return '41653-7'; // Glucose [Mass/volume] in Blood
      default:
        return '38053-7'; // Generic observation
    }
  };
  
  const getDisplayName = (dataType: string): string => {
    switch (dataType) {
      case 'steps':
        return 'Number of steps in 24 hour Measured';
      case 'heartRate':
        return 'Heart rate';
      case 'sleep':
        return 'Sleep duration';
      case 'bloodPressure':
        return 'Blood pressure panel';
      case 'weight':
        return 'Body weight';
      case 'bloodGlucose':
        return 'Glucose [Mass/volume] in Blood';
      default:
        return dataType.charAt(0).toUpperCase() + dataType.slice(1);
    }
  };
  
  // Convert a bundle of FHIR resources for sharing
  export const createFHIRBundle = (resources: FHIRResource[]): any => {
    return {
      resourceType: 'Bundle',
      type: 'collection',
      entry: resources.map(resource => ({
        resource: resource
      }))
    };
  };