var Lab = require('lab');
var Runtime = require('../lib/runtime');
var assert  = require('chai').assert;

var lab = exports.lab = Lab.script();
var suite   = lab.experiment;
var before  = lab.before;
var after   = lab.after;
var test    = lab.test;


suite('Runtime', function() {

  test('.rejectEmpty()', function(done) {
    assert.deepEqual(
      Runtime.rejectEmpty(['a', null, 'b', '', 'c']),
      ['a', 'b', 'c']
    );
    done();
  });

  test('.flatten()', function(done) {
    assert.deepEqual(
      Runtime.flatten([1, [2, 3], [4, [5, [6, 7]]]]),
      ['1', '2', '3', '4', '5', '6', '7']
    );

    assert.deepEqual(
      Runtime.flatten([1, 2, [3], [4, [5, 6], 7], [8, 9]]),
      ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    );

    assert.deepEqual(
      Runtime.flatten([1, 2, [], [3, [4, 5, []], 6]]),
      ['1', '2', '3', '4', '5', '6']
    );
    done();
  });

  test('.escape()', function(done) {
    assert.deepEqual(Runtime.escape(), '');
    assert.deepEqual(Runtime.escape(null), '');
    assert.deepEqual(Runtime.escape(' '), ' ');
    assert.deepEqual(Runtime.escape('<'), '&lt;');
    assert.deepEqual(Runtime.escape('>'), '&gt;');
    assert.deepEqual(Runtime.escape('"'), '&quot;');
    assert.deepEqual(Runtime.escape('&'), '&amp;');
    assert.deepEqual(Runtime.escape('<javascript>alert("alert!")</javascript>'), '&lt;javascript&gt;alert(&quot;alert!&quot;)&lt;/javascript&gt;');

    done();
  });

  test('.safe()', function(done) {
    assert.deepEqual(Runtime.escape(Runtime.safe('<javascript>alert("alert!")</javascript>')), '<javascript>alert("alert!")</javascript>');
    assert.deepEqual(Runtime.escape(Runtime.safe('')), '');
    assert.deepEqual(Runtime.escape(Runtime.safe()), '');
    assert.deepEqual(Runtime.escape(Runtime.safe(null)), '');

    done();
  });
});
