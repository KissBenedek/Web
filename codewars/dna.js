function dnaStrand(dna){
    // Define the mapping of each nucleotide to its complement
    const complement = {
        'A': 'T',
        'T': 'A',
        'C': 'G',
        'G': 'C'
    };

    // Split the input string, map each character to its complement, and join back to a string
    return dna.split('').map(nucleotide => complement[nucleotide]).join('');
}
