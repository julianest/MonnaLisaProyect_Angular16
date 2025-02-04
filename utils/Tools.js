export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function showErrorOrResponse (response, message, responseContainMessage, responseOverlayEtiq) {
  responseContainMessage.innerHTML =
    `<img src="/resources/${response}.jpg" alt="response" id="response-image">
      <p id="response-text">${message}</p>
    </div>`
  responseOverlayEtiq.style.display = 'flex'
  responseContainMessage.style.display = 'flex'

  setTimeout(() => {
    responseOverlayEtiq.style.display = 'none'
    responseContainMessage.style.display = 'none'
  }, 3000) // Ocultar después de 3sg
}
