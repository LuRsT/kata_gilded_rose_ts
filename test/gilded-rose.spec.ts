import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Normal Products', function () {

    it('should decrement quality by 1', function() {
        const gildedRose = new GildedRose([ new Item('foo', 5, 5) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('foo');
        expect(items[0].quality).to.equal(4);
        expect(items[0].sellIn).to.equal(4);
    });

    it('should decrement quality by 2 when sellIn is 0', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 5) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('foo');
        expect(items[0].quality).to.equal(3);
        expect(items[0].sellIn).to.equal(-1);
    });

    it('should never have quality below 0', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('foo');
        expect(items[0].quality).to.equal(0);
        expect(items[0].sellIn).to.equal(-1);
    });
});

describe('Aged Brie', function () {

    it('should increment quality by 1', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 4, 0) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(1);
    });

    it('should not pass quality 50', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 4, 50) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(50);
    });
});

describe('Sulfuras', function () {

    it('should stay the same', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 4, 50) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(50);
        expect(items[0].sellIn).to.equal(4);
    });

});

describe('Backstage passes', function () {

    it('should increase by 2 when sellin <= 10', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 10, 5) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(7);
        expect(items[0].sellIn).to.equal(9);
    });

    it('should increase by 3 when sellin <= 5', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 5, 5) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(8);
        expect(items[0].sellIn).to.equal(4);
    });

    it('should decrease quality to 0 when sellin == 0', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 5) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(0);
    });
});
