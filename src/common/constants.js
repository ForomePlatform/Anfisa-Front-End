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
export const STAT_TYPE_ZYGOSITY = 'zygosity';
export const STAT_GROUP = 'group';
export const STAT_NUMERIC = 'numeric';

export const NUMERIC_RENDER_TYPES = {
    COORDINATE: 'neighborhood',
    LOGARITHMIC: 'log',
    LINEAR: 'linear',
};

// List of allowed types to display in 'Filter Modal' (check utils.prepareStatList)
export const STAT_TYPES = [
    STAT_TYPE_INT,
    STAT_TYPE_FLOAT,
    STAT_TYPE_ENUM,
    STAT_TYPE_STATUS,
    STAT_TYPE_ZYGOSITY,
];

export const LOG_EDITOR_MARKS = [0, 0.0001, 0.001, 0.01, 0.05, 0.5, 1];

export const DEMO_NOTIFICATION = 'Demo Instance. Use at your own risk. Instance resets every night at 00:00 EDT';

export const NOT_FOUND_TAG = 'Tag not found, to create a new tag continue typing new tag name and press Enter';

export const DISCLAIMER = {
    title: 'DISCLAIMER',
    text: 'You are about to use a demo instance of Forome Anfisa software product.You agree to use it "as is" at your own risk. Forome development team doesn\'t take any responsibility for this software defects and inaccurate data. This instance resets every night at 00:00EDT. No configurations will be saved. Please press Accept if you agree to those terms of use or press Reject or just close this page to stop using this software.',
    ok: 'ACCEPT',
    cancel: 'REJECT',
    url: 'https://forome.org/',
};

// seconds
export const EXPIRED_TIME = 8 * 3600;

export const ANNOTATION_SERVICE_CONTS = {
    QUERY_PROCESSING_TEXT: `Query processing has been started. It may take a few minutes.
    Please don't close this tab in your browser.`,
    QUERY_FINISHED_TEXT: 'Query processing finished. Click "OK" to display the annotations found.',
    ROWS_LIMIT_EXCEEDED: 'Can\'t add any more variants, 100 is the maximum number for one query',
    CHOOSE_VCF_TEXT: 'Please choose the VCF file describing the variants to be annotated. Maximum file size: 10 MB. Maximum number of variants: 100.',
    TYPE_IN_DESC_TEXT: 'To get annotations for specific variants, please insert their descriptions in Forome format in the forms below (each in separate form, up to 100 variants per query).',
    PASTE_VCF_DESC_TEXT: 'To get annotations for specific variants, please paste the portion of VCF file with their descriptions in the form below (up to 100 variants per query).',
    REMOVE_ROW_BTN_TITLE: 'Remove this variant from your query',
};

export const ANNOTATION_SERVICE = 'ANNOTATION SERVICE';
