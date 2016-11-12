export default function getFullName(fn){
        let fnTrim = fn.trim();
        fnTrim = fnTrim.replace(/\s+/g, ' ');
        const re1 = new RegExp('([A-ZА-ЯЁ^\D][a-zа-яё\D]+[\-\s]?){1,3}', 'i');
        const re2 = new RegExp('[0-9_/]', 'i');
        if (fnTrim.match(re2) == null && fnTrim.match(re1) != null) {
            const arrFullName = fnTrim.split(/ /);
            if (arrFullName != null) {
                switch (arrFullName.length) {
                    case 1:
                        return arrFullName[0];
                        break;
                    case 2:
                        return arrFullName[1].toLowerCase()[0].toUpperCase() + arrFullName[1].toLowerCase().slice(1)  + ' ' + arrFullName[0].charAt(0).toUpperCase() + '.';
                        break;
                    case 3:
                        return arrFullName[2].toLowerCase()[0].toUpperCase() + arrFullName[2].toLowerCase().slice(1) + ' ' + arrFullName[0].charAt(0).toUpperCase() + '.' + ' ' + arrFullName[1].charAt(0).toUpperCase() + '.';
                        break;
                    default:
                        return 'Invalid fullname';
                }
            }
            return 'Invalid fullname';
        }
        return 'Invalid fullname';

}