const QUERY_PROCESSING_TEXT = 'Query processing has been started. It may take a few' +
    ' minutes.\n Please don\'t close this tab in your browser.';
const QUERY_FINISHED_TEXT = 'Query processing finished. Click "OK" to display the annotations found.';
const ROWS_LIMIT_EXCEEDED = 'Can\'t add any more variants, 100 is the maximum number for one query';
const CHOOSE_VCF_TEXT = 'Please choose the VCF file describing the variants to be annotated.' +
    ' Maximum file size: 10 MB. Maximum number of variants: 100.';
const TYPE_IN_DESC_TEXT = 'To get annotations for specific variants, please insert their' +
    ' descriptions in Forome format in the forms below (each in separate form, up to 100' +
    ' variants per query).';
const PASTE_VCF_DESC_TEXT = 'To get annotations for specific variants, please paste the portion' +
    ' of VCF file with their descriptions in the form below (up to 100 variants per query).';
export default {
    QUERY_PROCESSING_TEXT,
    QUERY_FINISHED_TEXT,
    ROWS_LIMIT_EXCEEDED,
    CHOOSE_VCF_TEXT,
    TYPE_IN_DESC_TEXT,
    PASTE_VCF_DESC_TEXT,
};
