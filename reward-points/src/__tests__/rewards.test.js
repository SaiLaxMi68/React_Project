import { rewardsPoints } from "../utils/util";
describe('Reward points logic',()=> {
    test('calculates for $120 rewards',()=> {
        expect(rewardsPoints(120)).toBe(90);
    })
     test('calculates for $50 rewards',()=> {
        expect(rewardsPoints(50)).toBe(0);
    })
     test('calculates for $80 rewards',()=> {
        expect(rewardsPoints(80)).toBe(30);
    })
})