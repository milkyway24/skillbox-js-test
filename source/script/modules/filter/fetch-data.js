export default async function fetchData(url) {
    const res = await fetch(url);

    try {
        const data = await res.json();
        return data;
    } catch {
        console.log('Ошибка получения данных');
        return []; // На данном этапе не было задачи обрабатывать ответы сервера, поэтому пока что возвращаю пустой массив, чтобы не было возни с тем, что должен был прийтим массив, а не пришел
    }
}