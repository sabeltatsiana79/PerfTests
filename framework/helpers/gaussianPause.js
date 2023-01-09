function boxMullerTransform() {
    const u1 = Math.random();
    const u2 = Math.random();
    
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    
    return { z0, z1 };
}

function getNormallyDistributedRandomNumber(mean, stddev) {
    const { z0, _ } = boxMullerTransform();
    
    return z0 * stddev + mean;
}

/*
const generatedNumbers = []

const mean   = 30.0;
const stddev = 2.0;

for (let i = 0; i < 100000; i += 1) {
    generatedNumbers.push(getNormallyDistributedRandomNumber(mean, stddev))
}

const sum = generatedNumbers.reduce((acc, i) => acc += i);
const count = generatedNumbers.length;
const calculatedMean = sum/count;

console.log(calculatedMean);
*/

class GaussianPause {
    async thinkTime(page, mean, stddev) {
      let pause = getNormallyDistributedRandomNumber(mean, stddev);
	  await page.waitForTimeout(pause);
    }
}

module.exports = GaussianPause;
