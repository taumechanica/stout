import { align } from './align';

describe('align', () => {
    it('should calculate optimal alignment', () => {
        const alignment = align('rests', 'stress');
        expect(alignment.length).toEqual(7);
        expect(alignment[0]).toEqual({ ins: 's' });
        expect(alignment[1]).toEqual({ ins: 't' });
        expect(alignment[2]).toEqual({ del: 'r', ins: 'r' });
        expect(alignment[3]).toEqual({ del: 'e', ins: 'e' });
        expect(alignment[4]).toEqual({ del: 's', ins: 's' });
        expect(alignment[5]).toEqual({ del: 't' });
        expect(alignment[6]).toEqual({ del: 's', ins: 's' });
    });

    it('should be tolerant to empty strings', () => {
        const alignment = align('', '');
        expect(alignment.length).toEqual(0);
    });
});
