# Express Detox

Remove unwanted stuff from your `request.body`.


## Usage

```javascript
const { only } = require('express-detox');

const only_user_params = only('first_name', 'last_name');

/*
    POST /
        {
            first_name: 'Nathan',
            last_name: 'Hoad',
            some_other_thing: 'ignored'
        }
*/

app.post('/', [only_user_params], (request, response) => {
    // Request Body only has first_name and last_name
    Users.create(request.body).then(user => {
        response.json(user);
    });
});
```


### Nested values

Specify nested values by passing objects to `only`:

```javascript
const only_nested_params = only('thing', { nested_thing: ['first', 'second'] });

/*
    POST /
        {
            nested_thing: {
                first: 'yes',
                second: 'yes',
                third: 'ignored'
            }
        }
*/
```
