import {generateRandNum, valueRangeMapper} from "../src/Logic/shared_functions"

describe('test generateRandNum function', () => {
  test('Make sure max range is inclusive', () => {
    let countInstancesOfMaxRange = 0
    for( let i = 0; i > 100; i++){
        const randNum = generateRandNum(2)        
        expect(randNum).toBeLessThan(3)
        expect(randNum).toBeGreaterThanOrEqual(0)
        if(randNum === 2){
            countInstancesOfMaxRange+=1
        }
    expect(countInstancesOfMaxRange).toBeGreaterThan(0)
    }
  });
  test('Make sure min range starts at 1', () => {
    for( let i = 0; i > 100; i++){
        const randNum:number = generateRandNum(2)
        const randNumBool = randNum === 1 || randNum ===2 
        expect(randNumBool).toBe(true)
    }
  });
});

const rangeMap = {
    10:"L1",
    20:"L2",
    30:"L3",
    40:"L4",
    50:"L5",
}
const inputAndExpected = [
    {input:0, expected:"L1"},
    {input:9, expected:"L1"},
    {input:10, expected:"L1"},
    {input:11, expected:"L2"},
    {input:19, expected:"L2"},
    {input:20, expected:"L2"},
    {input:21, expected:"L3"},
    {input:50, expected:"L5"},
]


describe('test valueRangeMapper function', () => {
    test('make sure threshold keys return expected values', () => {
        inputAndExpected.forEach((item)=>{
            expect(valueRangeMapper(item.input, rangeMap)).toEqual(item.expected)
        })
    });
    test('make sure a value greater than max throws error', () => {
        const errorCase = 51
        expect(() => valueRangeMapper(errorCase, rangeMap)).toThrow()
  });
});