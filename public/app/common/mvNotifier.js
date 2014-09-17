/*
Módulo para notificação de mensagens cliente com library 'toastr'
 */
/*
Encaplusa/Regista a library 'toastr' como um serviço
mvToastr -> vai ser/apontar a/para a library 'toastr'
pq?
resposta: para que a library possa ser usada como dependencia para outros serviços angular
 */
angular.module('app').value('mvToastr', toastr);


angular.module('app').factory('mvNotifier', function(mvToastr) {
    return {
        notify: function(msg, isError) {
            if (isError) {
                mvToastr.error(msg);
            } else {
                mvToastr.success(msg);
            }
        }
    }
});