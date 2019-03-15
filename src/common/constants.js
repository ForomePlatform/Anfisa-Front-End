export const VARIANT_ICON_GREEN = 'green';
export const VARIANT_ICON_GREEN_BROKEN = 'green-cross';
export const VARIANT_ICON_YELLOW = 'yellow';
export const VARIANT_ICON_YELLOW_BROKEN = 'yellow-cross';
export const VARIANT_ICON_RED = 'red';
export const VARIANT_ICON_RED_BROKEN = 'red-cross';
export const VARIANT_ICON_GREY = 'grey';
export const VARIANT_ICON_GREY_BROKEN = 'grey-cross';

export const TAGS_COLORS = {
    'Benign/Likely benign': '#1a3e6c',
    'False positives': '#a9983d',
    'Previously Triaged': '#1b9b4a',
    'Not categorized': '#da5959',
    'Previously categorized': '#2bb3ed',
};

export const LOGICAL_OPERATORS = {
    OR: 'Any',
    AND: 'All',
    NOT: 'None',
    ONLY: 'Only',
};

export const LOGICAL_OPERATORS_STATUS = {
    OR: 'Any',
    NOT: 'None',
};

export const ENUM_DEFAULT_OPERATOR = Object.keys(LOGICAL_OPERATORS)[0];

export const STAT_TYPE_INT = 'int';
export const STAT_TYPE_FLOAT = 'float';
export const STAT_TYPE_ENUM = 'enum';
export const STAT_TYPE_STATUS = 'status';
export const STAT_GROUP = 'group';
export const STAT_NUMERIC = 'numeric';

export const STAT_TYPES = [STAT_TYPE_INT, STAT_TYPE_FLOAT, STAT_TYPE_ENUM, STAT_TYPE_STATUS];

export const LOG_EDITOR_FIELDS = [
    'gnomAD_AF',
    'gnomAD_AF_Exomes',
    'gnomAD_AF_Genomes',
    'gnomAD_AF_Proband',
    'gnomAD_PopMax_AF',
];

export const LOG_EDITOR_MARKS = [0, 0.0001, 0.001, 0.01, 0.05, 0.5, 1];
