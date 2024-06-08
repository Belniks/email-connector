export interface GetOptions {
  /**
   * Filter query for the request
   *
   * @type {string}
   * @memberof GetOptions
   */
  filter?: string;

  /**
   * Order by query for the request
   *
   * @type {string}
   * @memberof GetOptions
   */
  orderBy?: string;

  /**
   * Select query for the request
   *
   * @type {string}
   * @memberof GetOptions
   */
  select?: string;

  /**
   * Expand query for the request
   *
   * @type {string}
   * @memberof GetOptions
   */
  top?: number;

  /**
   * Skip query for the request
   *
   * @type {number}
   * @memberof GetOptions
   */
  skip?: number;
}
