describe('mvUser', function() {
    beforeEach(module('app'));

    describe('isAdmin', function() {
        it('Deve retornar falso se roles nao tem admin role', inject(function(mvUser) {
            var user = new mvUser();
            user.roles = ['nao admin'];
            expect(user.isAdmin()).to.be.falsey;
        }));

        it('Deve retornar true se roles tiver admin role', inject(function(mvUser) {
            var user = new mvUser();
            user.roles = ['admin'];
            expect(user.isAdmin()).to.be.true;
        }));
    });


});