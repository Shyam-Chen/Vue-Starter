/**
 * @example
 * 'foo + bar'.replace(escape, '\\$&');
 * output: "foo \+ bar"
 */
export const escape = /[.*+?^${}()|[\]\\]/g;

/**
 * @example
 * email.test('shyam.chen@gmail.com')
 * output: true
 *
 * email.test('shyamchen@gmailcom')
 * output: false
 */
export const email = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
