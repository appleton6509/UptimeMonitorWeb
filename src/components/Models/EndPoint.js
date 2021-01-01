/**
 * @param {string} id
 */
export class EndPoint {
    constructor(id,ip ,description) {
        this.id = id;
        this.ip = ip;
        this.description = description;
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