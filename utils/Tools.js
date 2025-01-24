export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function setupPasswordToggle (togglePassword, passwordInput) {
  togglePassword.addEventListener('click', function () {
    const type = passwordInput.type === 'password' ? 'text' : 'password'
    passwordInput.type = type
    togglePassword.textContent = type === 'password' ? '👁️' : '🙈'
  })
}

export function showOnSpinner (loadingIndicator) {
  loadingIndicator.style.display = 'flex'
}

export function showOffSpinner (loadingIndicator) {
  loadingIndicator.style.display = 'none'
}

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
