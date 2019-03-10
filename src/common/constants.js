export const VARIANT_ICON_GREEN = 'green';
export const VARIANT_ICON_GREEN_BROKEN = 'green-cross';
export const VARIANT_ICON_YELLOW = 'yellow';
export const VARIANT_ICON_YELLOW_BROKEN = 'yellow-cross';
export const VARIANT_ICON_RED = 'red';
export const VARIANT_ICON_RED_BROKEN = 'red-cross';
export const VARIANT_ICON_GREY = 'grey';
export const VARIANT_ICON_GREY_BROKEN = 'grey-cross';

export const TAGS_COLORS = {
    'Benign/Likely benign': '#D2B48C',
    'False positives': '#F0E68C',
    'Previously Triaged': '#87CEFA',
    'Not categorized': '#DDA0DD',
    'Previously categorized': '#66CDAA',
};

export const LOGICAL_OPERATORS = {
    OR: 'Any',
    AND: 'All',
    NOT: 'None',
    ONLY: 'Only',
};

export const ENUM_DEFAULT_OPERATOR = Object.keys(LOGICAL_OPERATORS)[0];
