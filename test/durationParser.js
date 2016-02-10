var expect = require('expect');

var durationParser = require('../src/js/utils/durationParser');

describe('durationParser', function() {
	describe('isValidDurationValue', function() {
		it('should return true for valid strings', function() {
			expect(durationParser.isValidDurationValue('0')).toEqual(true);
			expect(durationParser.isValidDurationValue('0')).toEqual(true);
			expect(durationParser.isValidDurationValue('1')).toEqual(true);
			expect(durationParser.isValidDurationValue('001')).toEqual(true);
			expect(durationParser.isValidDurationValue('0000001')).toEqual(true);
			expect(durationParser.isValidDurationValue('00000010')).toEqual(true);
			expect(durationParser.isValidDurationValue('60')).toEqual(true);
		});

		it('should return true for valid numbers', function() {
			expect(durationParser.isValidDurationValue(50)).toEqual(true);
			expect(durationParser.isValidDurationValue(60)).toEqual(true);
			expect(durationParser.isValidDurationValue(0)).toEqual(true);
			expect(durationParser.isValidDurationValue(1)).toEqual(true);
		});

		it('should return false for invalid values', function() {
			expect(durationParser.isValidDurationValue('123')).toEqual(false);
			expect(durationParser.isValidDurationValue('0asdasd')).toEqual(false);
			expect(durationParser.isValidDurationValue('61')).toEqual(false);
			expect(durationParser.isValidDurationValue('-1')).toEqual(false);
			expect(durationParser.isValidDurationValue('sd1')).toEqual(false);
			expect(durationParser.isValidDurationValue(61)).toEqual(false);
			expect(durationParser.isValidDurationValue(['23'])).toEqual(false);
			expect(durationParser.isValidDurationValue([23,'34'])).toEqual(false);
		});
	});
});
