// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ["A", "T", "C", "G"];
    return dnaBases[Math.floor(Math.random() * 4)];
  };
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
  };
  
  const pAequorFactory = (num, arr) => {
    return {
      specimenNum: num,
      dna: arr,
      mutate() {
        // randomly select a base in the object’s dna
        const selectedBase = this.dna[
          Math.floor(Math.random() * this.dna.length)
        ];
        //  change the base from this.dna that is equivalent to currentBase
        console.log(selectedBase);
        this.dna = this.dna.map((base) => {
          while (base === selectedBase) {
            base = returnRandBase();
            if (base !== selectedBase) {
              break;
            }
          }
          return base;
        });
      },
      compareDNA(obj) {
        //  compare initial DNA with this.dna.mutate()
        let sameBaseCount = 0;
        let sameBase = [];
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === obj.dna[i]) {
            sameBaseCount++;
            sameBase.push(obj.dna[i]);
          }
        }
        return `specimen #${this.specimenNum} and specimen #${
          obj.specimenNum
        } have ${(
          (sameBaseCount / obj.dna.length) *
          100
        ).toFixed()}% DNA in common \n ${sameBase.join(
          ", "
        )} \n ${sameBaseCount}`;
      },
      // This method finds out if 'G' and 'C' exist 60% in this.dna
      willLikelySurvive() {
        let count = 0;
        this.dna.forEach((base) => (base === "C" || base === "G" ? count++ : ""));
        return (count / this.dna.length) * 100 >= 60;
      },
    };
  };
  // This creates 30 instances of pAequor data that is stored in a list
  let pAequor = [];
  for (let i = 0; i <= 30; i++) {
    pAequor.push(pAequorFactory(i, mockUpStrand()));
  }
  