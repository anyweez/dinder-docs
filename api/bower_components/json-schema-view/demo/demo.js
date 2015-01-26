'use strict';

var app = angular.module('demo', ['mohsen1.json-schema-view', 'jsonFormatter']);

app.controller('MainCtrl', function ($scope) {

  $scope.schemas = [
    {
      title: 'Simple',
      schema: {
        title: 'Name',
        description: 'A name',
        type: "string"
      }
    },

    {
      title: 'Object',
      schema: {
        type: 'object',
        title: 'Person',
        description: 'A simple person object',
        properties: {
          name: {
            type: 'string'
          },
          age: {
            type: 'integer'
          }
        }
      }
    },

   {
      title: 'Array',
      schema: {
        type: 'array',
        title: 'Names',
        description: 'An array of names',
        items: {
          type: 'string'
        }
      }
    },

    {
      title: 'Required',
      schema: {
        properties: {
          account_number: {
            type: 'integer'
          }
        },
        required: ['account_number']
      }
    },

    {
      title: 'Title and Description',
      schema: {
        title: 'Person',
        description: 'A person schema that has name and age fields',
        properties: {
          name: {
            type: 'string'
          },
          age: {
            type: 'integer'
          }
        }
      }
    },

    {
      title: 'Format, Minimum and Maximum',
      schema: {
        properties: {
          account_number: {
            type: 'integer',
            format: 'int64',
            minimum: '400000',
            maximum: '900000'
          }
        },
        required: ['account_number']
      }
    },

    {
      title: 'Nested Array and Objects',
      schema: {
        description: 'A teacher',
        properties: {
          name: {
            type: 'string'
          },
          students: {
            type: 'array',
            items: {
              type: 'integer'
            }
          },
          classes: {
            type: 'array',
            items: {
              properties: {
                id: {
                  type: 'integer'
                },
                name: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    },

    {
        title: 'Deep',
        schema: {
            title: 'Level 1',
            properties: {
                child: {
                    title: 'Level 2',
                    properties: {
                        child: {
                            title: 'Level 3',
                            properties: {
                                child: {
                                    title: 'Level 4',
                                    properties: {
                                        value: {
                                            type: 'string'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    {
      title: 'Complex',
      schema: {
        title: 'Person',
        description: 'A person in our database',
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          age: {
            type: 'integer',
            format: 'int64',
            minimum: 0
          },
          email: {
            type: 'string'
          },
          single: {
            type: 'boolean'
          },
          school: {
            type: 'object',
            title: 'School',
            description: 'A School',
            properties: {
              name: {
                type: 'string'
              },
              district: {
                type: 'string'
              }
            },
            required: ['name']
          },
          interests: {
            type: 'array',
            items: {
              title: 'Interest',
              description: 'An interest',
              properties: {
                name: {
                  type: 'string'
                }
              },
              required: ['name']
            }
          }
        },
        required: ['name', 'age']
      }
    }
  ];
});
