'use strict';

const _ = require('lodash');
const ViewModel = require('lib/reporters/html/view-model');

const mkStubResult = (opts) => {
    opts = opts || {};

    return _.defaultsDeep(opts, {
        state: {name: 'name-default'},
        suite: {
            path: ['suite/path-default'],
            metaInfo: {sessionId: 'sessionId-default'},
            file: 'default/path/file.js'
        }
    });
};

describe('ViewModel', () => {
    const sandbox = sinon.sandbox.create();

    it('should content file in metaInfo', () => {
        const config = {forBrowser: sandbox.stub().returns({})};
        const model = new ViewModel(config);
        const getResult_ = (model) => model.getResult().suites[0].children[0].browsers[0].result;

        model.addSuccess(mkStubResult({
            suite: {file: '/path/file.js'}
        }));

        assert.include(getResult_(model).metaInfo, '\"file\": \"/path/file.js\"');
    });
});
