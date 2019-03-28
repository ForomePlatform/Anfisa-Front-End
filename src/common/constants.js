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

export const NUMERIC_RENDER_TYPES = {
    COORDINATE: 'neighborhood',
    LOGARITHMIC: 'log',
    LINEAR: 'linear',
};

export const STAT_TYPES = [STAT_TYPE_INT, STAT_TYPE_FLOAT, STAT_TYPE_ENUM, STAT_TYPE_STATUS];

export const LOG_EDITOR_MARKS = [0, 0.0001, 0.001, 0.01, 0.05, 0.5, 1];

export const DEMO_NOTIFICATION = 'Demo Instance. Use at your own risk. Instance resets every night at 00:00 EDT';

export const NOT_FOUND_TAG = 'Tag not found';

export const DISCLAIMER = {
    title: 'DISCLAIMER',
    text: 'You are about to use a demo instance of Forome Anfisa software product.You agree to use it "as is" at your own risk. Forome development team doesn\'t take any responsibility for this software defects and inaccurate data. This instance resets every night at 00:00EDT. No configurations will be saved. Please press Accept if you agree to those terms of use or press Reject or just close this page to stop using this software.',
    ok: 'ACCEPT',
    cancel: 'REJECT',
    url: 'https://forome.org/',
};

// seconds
export const EXPIRED_TIME = 8 * 3600;
