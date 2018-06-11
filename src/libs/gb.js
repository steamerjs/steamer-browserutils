// compatible with global
let global = (typeof global !== 'undefined') ? global : {};

if (typeof window !== 'undefined') {
    global = window;
}
else if (typeof self !== 'undefined') {
    global = self;
}

export default global;
