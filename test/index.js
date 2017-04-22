const { test } = require('ava');


const Detox = require('..');


test('it removes unwanted values from an object', t => {
    var request = {
        body: {
            thing: 'value',
            not_a_thing: 'bad',
            nested_thing: {
                first: 'yes',
                second: 'no'
            }
        }
    }
    
    t.true(Object.keys(request.body).includes('not_a_thing'));
    
    const only = Detox.only('thing', { nested_thing: ['first'] });
    
    t.is(typeof only, "function");
    
    return only(request, null, () => {
        const body_keys = Object.keys(request.body);
        
        t.true(body_keys.includes('thing'));
        t.false(body_keys.includes('not_a_thing'));
        t.true(body_keys.includes('nested_thing'));
        
        const nested_keys = Object.keys(request.body.nested_thing);
        
        t.true(nested_keys.includes('first'));
        t.false(nested_keys.includes('second'));
    });
});
