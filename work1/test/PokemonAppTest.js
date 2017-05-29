var expect = require('chai').expect;
var assert = require('chai').assert;
require('mocha-sinon');

const Pokemon = require('../hw1-new.js').Pokemon;
const PokemonList = require('../hw1-new.js').PokemonList;

describe('тестируем приложение Pokemon', function () {
    beforeEach(function() {
        var log = console.log;
        this.sinon.stub(console, 'log').callsFake(function() {
            return log.apply(log, arguments);
        });
    });
    
	describe('класс Pokemon.метод show()', function () {
                
		it('возвращает корректные имя и уровень', function() {
			new Pokemon("Rampardos", 7).show();
            expect( console.log.calledWith('Имя: Rampardos, уровень: 7') ).to.be.true;
		});
        
		it('возвращает корректное имя', function() {
			new Pokemon("Rampardos").show();
            expect( console.log.calledWith('Имя: Rampardos, уровень: undefined') ).to.be.true;
		});
        
		it('возвращает корректный уровень', function() {
			new Pokemon("", 7).show();
            expect( console.log.calledWith('Имя: , уровень: 7') ).to.be.true;
		});
        
        it('возвращает undefined при непереданных аргументах', function() {
			new Pokemon().show();
            expect( console.log.calledWith('Имя: undefined, уровень: undefined') ).to.be.true;
		});
	});
    
	describe('класс PokemonList', function () {

        var list;

        beforeEach(function() {
            list = new PokemonList (new Pokemon("Rampardos", 7), new Pokemon("Kricketot", 4));
        });
            
        describe("метод add()", () => {
            
            it("добавление покемона", () => {
                list.add ("Chingling", 1);
                assert(list[2] !== undefined, "покемон не добавлен");
            });
            
            it("добавление покемона без уровня", () => {
                list.add ("Chingling");
                assert(list[2].name == "Chingling" && list[2].level == undefined, "покемон без уровня не добавлен");
            });
            
            it("добавление покемона без имени", () => {
                list.add ("", 1);
                assert(list[2].name == "" && list[2].level == 1, "покемон без имени не добавлен");
            });
            
            it("добавление покемона без данных", () => {
                list.add ();
                assert(list[2].name == undefined && list[2].level == undefined, "покемон без данных не добавлен");
            });

            it("проверка введенных данных", () => {
                list.add ("Chingling", 1);
                assert(list[2].name == "Chingling" && list[2].level == 1, "данные некорректны");
            });
        });
        
        describe("метод show()", () => {
            
            it("Корректный показ одного покемона", () => {
                list = new PokemonList (new Pokemon("Chingling", 1));
                list.show();
                expect(console.log.calledWith('Имя: Chingling, уровень: 1')).to.be.true;
                expect(console.log.calledWith('Общее количество: 1')).to.be.true;
            });

            it("Корректный показ нескольких покеномов", () => {
                list.show();
                expect(console.log.calledWith('Имя: Rampardos, уровень: 7')).to.be.true;
                expect(console.log.calledWith('Имя: Kricketot, уровень: 4')).to.be.true;
                expect(console.log.calledWith('Общее количество: 2')).to.be.true;
            });
            
        });
        
        describe("метод max()", () => {

            it("вернет покемона с максимальным уровнем", () => {
                expect(list.max().name == "Rampardos" && list.max().level == 7).to.be.true;
            });

            it("вернет undefined, если список пуст", () => {
                list = new PokemonList ();
                expect(list.max()).to.be.undefined;
            });


        });

	})
})