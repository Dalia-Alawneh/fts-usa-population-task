const API_URL = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population'

const getPopulationData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.error("Error", e.message)
    new Toast({
      message: e.message,
      type: 'danger'
    });
    return { data: [] }
  }
}

const renderPopulationData = (data) => {
  return data.map(item => `
    <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      <td class="py-3 px-6">${item["ID Nation"]}</td>
      <td class="py-3 px-6">${item["ID Year"]}</td>
      <td class="py-3 px-6">${item["Population"]}</td>
      <td class="py-3 px-6">${item["Nation"]}</td>
    </tr>
    `).join('');
}

const showDataTable = async () => {
  const { data } = await getPopulationData();
  const populationTable = document.getElementById('populations')
  if (data) {
    populationTable.innerHTML = renderPopulationData(data)
  } else {
    populationTable.innerHTML = '<td colspan="5" class="py-4 w-full text-center">No Data Found</td>'
  }
}

showDataTable();