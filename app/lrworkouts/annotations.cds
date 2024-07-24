using WorkoutService as service from '../../srv/workouts-service';
annotate service.Workouts with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'level',
                Value : level,
            },
            {
                $Type : 'UI.DataField',
                Label : 'for',
                Value : for,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Exercises',
            ID : 'Exercises',
            Target : 'exercises/@UI.LineItem#Exercises',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'level',
            Value : level,
        },
        {
            $Type : 'UI.DataField',
            Label : 'for',
            Value : for,
        },
    ],
);

annotate service.WorkoutExercises with @(
    UI.LineItem #Exercises : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
            ![@UI.Hidden],
        },
        {
            $Type : 'UI.DataField',
            Value : round,
            Label : 'round',
        },
        {
            $Type : 'UI.DataField',
            Value : exRound,
            Label : 'exRound',
        },
        {
            $Type : 'UI.DataField',
            Value : exercise.name,
            Label : 'name',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : duration,
            Label : 'duration',
        },]
);

annotate service.Workouts with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : name,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : level,
        },
    }
);
annotate service.WorkoutExercises with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : exercise.name,
        },
        TypeName : '',
        TypeNamePlural : '',
    }
);
