export function navigateToDetailsPage(sneakerId: string): void {
  window.location.href = `sneakers.html?id=${sneakerId}`;
}
