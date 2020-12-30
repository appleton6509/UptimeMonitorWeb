/**
 * @param {string} id
 */
export class EndPoint {
    constructor(userid, description) {
        this.userid = userid;
        this.description = description
    }
    /**
     * 
     * @param {object} json 
     * @returns {EndPoint} endpoint class object
     */
    static fromJson(json) {
        return Object.assign(new EndPoint(), json);
    }
  }