suite(`"About" page tests`, () => {
    test(`page should conain link to contact page`, () => {
        // if (true) assert.length > 0
        assert($('a[href="/contact"]')).length;
    });
});