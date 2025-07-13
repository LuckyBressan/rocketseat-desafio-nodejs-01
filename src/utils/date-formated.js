export default function dateFormated() {
    return (new Date()).toLocaleString().replace(',', '')
};
