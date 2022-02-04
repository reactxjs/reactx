# ReaxtX
Simplified ReactJS Store manager with persistent storage
This is loosely based on VueX (VueJS Store manager)

# How to setup local repo testing
1. Clone the repo
2. run npm install
3. run npm start
4. add ```"reactx": "file:path/to/reactx"``` to your package.json

# Install
```npm install --save @reactxjs/reactx```

# Create Store
```
import ReactX from '@reactxjs/reactx';
import test from './modules/test';

export default new ReactX({ 
  modules: [
    test,
  ]
 });
``` 
# Create Store module
```
export default {
  name: 'test',
  persistent: true,
  state: {
      test: [],
  },
  getters: {
      get: state => state.test
  },
  mutations: {
    setup(state, data) {
        state.test = data;
    }
  },
  actions: {
      setup({ commit }, data) {
          commit('setup', data);
      },
  },
};
```
# Bind your store to React instance
```
import React from 'react';

import store from './store';

React.$store = store;
```

# Dispatch to store
```
React.$store.dispatch('test/setup', [1, 2, 3]);
```

# Get from store
```
React.$store.getters('test/get')
```
