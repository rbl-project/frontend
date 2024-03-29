export const REQUEST_STATUS_LOADING = "loading";
export const REQUEST_STATUS_SUCCEEDED = "succeeded";
export const REQUEST_STATUS_FAILED = "failed";
export const REQUEST_STATUS_IDLE = "idle";

export const CUSTOM_ERROR_MESSAGE = "Something Went Wrong. Please Refresh";
export const CUSTOM_SUCCESS_MESSAGE = "Successful";

export const SMALLEST_VALID_STRING_LENGTH = 2;
export const LARGEST_VALID_STRING_LENGTH = 30;

export const MAXIMUM_ALLOWED_DATASETS_PER_USER = 3;

export const NUMERICAL = "Numerical";
export const CATEGORICAL = "Categorical";

export const DRAWER_WIDTH = 300;

export const DATASET_VIEW = "Dataset View";

// EDA Functions
export const EDA_PATH = "/dashboard/exploratory-data-analysis"
export const DATASET_OVERVIEW = "Dataset Overview";
export const DATASET_OVERVIEW_PATH = EDA_PATH + "/dataset-overview";
export const DATA_CORRELATION = "Data Correlation";
export const DATA_CORRELATION_PATH = EDA_PATH + "/data-correlation";
export const TABULAR_REPRESENTATION = "Tabular Representation";
export const TABULAR_REPRESENTATION_PATH = EDA_PATH + "/tabular-representation";
export const GRAPHICAL_REPRESENTATION = "Graphical Representation";
export const GRAPHICAL_REPRESENTATION_PATH = EDA_PATH + "/graphical-representation";

// Data Preprocessing Functions
export const DATA_PREPROCESSING_PATH = "/dashboard/data-preprocessing"
export const MISSING_VALUE_IMPUTATION = "Missing Value Imputation";
export const MISSING_VALUE_IMPUTATION_PATH = DATA_PREPROCESSING_PATH + "/missing-value-imputation";
export const DATA_CLEANING = "Data Cleaning";
export const DATA_CLEANING_PATH = DATA_PREPROCESSING_PATH + "/data-cleaning";

// Data Cleaning Constants
export const DROP_BY_CATEGORICAL_VALUE_API_TASK_TYPE = "drop_by_categorical_value";
export const DROP_BY_NUMERICAL_RANGE_API_TASK_TYPE = "drop_by_numerical_range";
export const DROP_BY_COLUMN_NAME_API_TASK_TYPE = "drop_by_column_name";
export const DROP_BY_ROW_INDEX_API_TASK_TYPE = "drop_by_row_index";
export const CHANGE_DATA_TYPE_API_TASK_TYPE = "change_data_type";
export const FIND_AND_REPLACE_API_TASK_TYPE = "find_and_replace";
export const RENAME_COLUMN_API_TASK_TYPE = "rename_column";
export const CHANGE_COLUMN_TYPE_API_TASK_TYPE = "change_column_type";
export const COLUMN_TYPE_OPTIONS = ["Categorical", "Numerical"];

// Feature Engineering Functions
export const FEATURE_ENGINEERING_PATH = "/dashboard/feature-engineering"
export const FEATURE_ENCODING = "Feature Encoding";
export const FEATURE_ENCODING_PATH = FEATURE_ENGINEERING_PATH + "/feature-encoding";
export const DATA_TRANSFORMATION = "Data Transformation";
export const DATA_TRANSFORMATION_PATH = FEATURE_ENGINEERING_PATH + "/data-transformation";
export const DATA_DISCRETIZATION = "Data Discretization";
export const DATA_DISCRETIZATION_PATH = FEATURE_ENGINEERING_PATH + "/data-discretization";

// Feature Encoding Constants
export const ONE_HOT_ENCODING = "one_hot_encoding";
export const ORDINAL_ENCODING = "ordinal_encoding";
export const BINARY_ENCODING = "binary_encoding";
export const TARGET_ENCODING = "target_encoding";
export const FREQUENCY_ENCODING = "frequency_encoding";





