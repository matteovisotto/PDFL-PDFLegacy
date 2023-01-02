const SIMILARITY_THRESHOLD = 0.78;

const MAX_POPUP_TEXT_LENGTH = 500;

const TRANSPARENT_WHITE = "rgba(255,255,255,0.2)";

const PAGE_INPUT_VALIDATION_REGEX = /[0-9]+/;

const POPUP_DISAPPEAR_TIMEOUT = 2500;
const POPUP_APPEAR_TIMEOUT = 100;

const MAX_GRAPH_DEPTH = 2;

const MAX_CITATION = 1;

const MAX_REFERENCES = 1;

const TEN_MILLISECONDS = 10;

const EXTRA_PAGES_TO_RENDER = 1;

const MAX_ZOOM_FACTOR = 2;
const MIN_ZOOM_FACTOR = 0.4;

const LOADING_TEXT = "Loading...";

const SELECTION_INSTRUCTION_TEXT =
  "Select a text in the PDF and click the button to generate the summary";

const MOUSE_MIN_SELECTION_TIME = 200;

const FIELD_OF_STUDY_COLOR = {
  Medicine: "rgba(43, 213, 20, 0.8)",
  Chemistry: "rgba(37, 152, 170, 0.8)",
  Economics: "rgba(230, 236, 39, 0.8)",
  "Materials Science": "rgba(193, 168, 116, 0.8)",
  Philosophy: "rgba(220, 84, 207, 0.8)",
  "Computer Science": "rgba(255, 0, 0, 0.8)",
  Geology: "rgba(126, 98, 40, 0.8)",
  Psychology: "rgba(255, 46, 46, 0.8)",
  Art: "rgba(121, 242, 210, 0.8)",
  History: "rgba(255, 218, 46, 0.8)",
  Geography: "rgba(27, 218, 46, 0.8)",
  "Political Science": "rgba(221, 39, 236, 0.8)",
  Sociology: "rgba(224, 101, 251, 0.8)",
  Business: "rgba(243, 255, 7, 0.8)",
  Biology: "rgba(52, 224, 89, 0.8)",
  Education: "rgba(3, 41, 166, 0.8)",
  Mathematics: "rgba(44, 21, 101, 0.8)",
  "Environmental Science": "rgba(21, 112, 49, 0.8)",
  Engineering: "rgba(219, 112, 49, 0.8)",
  Physics: "rgba(53, 109, 96, 0.8)",
  Law: "rgba(53, 99, 255, 0.8)",
  Linguistics: "rgba(245, 40, 145, 0.8)",
  "Missing Color": "rgba(255, 255, 255, 0.6)",
  Agricultural: "rgba(3, 184, 58, 0.8)",
};

const SUMMARIZER_STOP_LIST = [
  "",
  "a",
  "about",
  "above",
  "above",
  "across",
  "after",
  "afterwards",
  "again",
  "against",
  "all",
  "almost",
  "alone",
  "along",
  "already",
  "also",
  "although",
  "always",
  "am",
  "among",
  "amongst",
  "amoungst",
  "amount",
  "an",
  "and",
  "another",
  "any",
  "anyhow",
  "anyone",
  "anything",
  "anyway",
  "anywhere",
  "are",
  "around",
  "as",
  "at",
  "back",
  "be",
  "became",
  "because",
  "become",
  "becomes",
  "becoming",
  "been",
  "before",
  "beforehand",
  "behind",
  "being",
  "below",
  "beside",
  "besides",
  "between",
  "beyond",
  "bill",
  "both",
  "bottom",
  "but",
  "by",
  "call",
  "can",
  "cannot",
  "cant",
  "co",
  "con",
  "could",
  "couldnt",
  "cry",
  "de",
  "describe",
  "detail",
  "do",
  "done",
  "down",
  "due",
  "during",
  "each",
  "eg",
  "eight",
  "either",
  "eleven",
  "else",
  "elsewhere",
  "empty",
  "enough",
  "etc",
  "even",
  "ever",
  "every",
  "everyone",
  "everything",
  "everywhere",
  "except",
  "few",
  "fifteen",
  "fify",
  "fill",
  "find",
  "fire",
  "first",
  "five",
  "for",
  "former",
  "formerly",
  "forty",
  "found",
  "four",
  "from",
  "front",
  "full",
  "further",
  "get",
  "give",
  "go",
  "had",
  "has",
  "hasnt",
  "have",
  "he",
  "hence",
  "her",
  "here",
  "hereafter",
  "hereby",
  "herein",
  "hereupon",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "however",
  "hundred",
  "ie",
  "if",
  "in",
  "inc",
  "indeed",
  "interest",
  "into",
  "is",
  "it",
  "its",
  "itself",
  "keep",
  "last",
  "latter",
  "latterly",
  "least",
  "less",
  "ltd",
  "made",
  "many",
  "may",
  "me",
  "meanwhile",
  "might",
  "mill",
  "mine",
  "more",
  "moreover",
  "most",
  "mostly",
  "move",
  "much",
  "must",
  "my",
  "myself",
  "name",
  "namely",
  "neither",
  "never",
  "nevertheless",
  "next",
  "nine",
  "no",
  "nobody",
  "none",
  "noone",
  "nor",
  "not",
  "nothing",
  "now",
  "nowhere",
  "of",
  "off",
  "often",
  "on",
  "once",
  "one",
  "only",
  "onto",
  "or",
  "other",
  "others",
  "otherwise",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "part",
  "per",
  "perhaps",
  "please",
  "put",
  "rather",
  "re",
  "same",
  "see",
  "seem",
  "seemed",
  "seeming",
  "seems",
  "serious",
  "several",
  "she",
  "should",
  "show",
  "side",
  "since",
  "sincere",
  "six",
  "sixty",
  "so",
  "some",
  "somehow",
  "someone",
  "something",
  "sometime",
  "sometimes",
  "somewhere",
  "still",
  "such",
  "system",
  "take",
  "ten",
  "than",
  "that",
  "the",
  "their",
  "them",
  "themselves",
  "then",
  "thence",
  "there",
  "thereafter",
  "thereby",
  "therefore",
  "therein",
  "thereupon",
  "these",
  "they",
  "thickv",
  "thin",
  "third",
  "this",
  "those",
  "though",
  "three",
  "through",
  "throughout",
  "thru",
  "thus",
  "to",
  "together",
  "too",
  "top",
  "toward",
  "towards",
  "twelve",
  "twenty",
  "two",
  "un",
  "under",
  "until",
  "up",
  "upon",
  "us",
  "very",
  "via",
  "was",
  "we",
  "well",
  "were",
  "what",
  "whatever",
  "when",
  "whence",
  "whenever",
  "where",
  "whereafter",
  "whereas",
  "whereby",
  "wherein",
  "whereupon",
  "wherever",
  "whether",
  "which",
  "while",
  "whither",
  "who",
  "whoever",
  "whole",
  "whom",
  "whose",
  "why",
  "will",
  "with",
  "within",
  "without",
  "would",
  "yet",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
  "the",
];

const THUMBNAIL_PAGE_VIEWPORT_SCALE = 0.2;

export {
  SIMILARITY_THRESHOLD,
  MAX_POPUP_TEXT_LENGTH,
  PAGE_INPUT_VALIDATION_REGEX,
  POPUP_DISAPPEAR_TIMEOUT,
  POPUP_APPEAR_TIMEOUT,
  TRANSPARENT_WHITE,
  MAX_GRAPH_DEPTH,
  MAX_CITATION,
  MAX_REFERENCES,
  TEN_MILLISECONDS,
  FIELD_OF_STUDY_COLOR,
  SUMMARIZER_STOP_LIST,
  MOUSE_MIN_SELECTION_TIME,
  EXTRA_PAGES_TO_RENDER,
  MAX_ZOOM_FACTOR,
  MIN_ZOOM_FACTOR,
  LOADING_TEXT,
  SELECTION_INSTRUCTION_TEXT,
  THUMBNAIL_PAGE_VIEWPORT_SCALE
};
