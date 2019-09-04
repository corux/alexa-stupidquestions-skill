declare module "*.txt" {
  const content: string;
  export = content;
}

interface History {
  /** Mapping with the timestamp of the last time the question was played. */
  [question: string]: number;
}
