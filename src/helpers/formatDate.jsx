export default function formatDate(date) {
    const newDate = new Date(date.split('T')[0].split('-'))
    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return newDate.toLocaleDateString('en-US', opciones)
}
