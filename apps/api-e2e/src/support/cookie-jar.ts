export class CookieJar {
  private static jar = new Map<string, string>()

  static getCookie(username: string): string | null {
    return this.jar.get(username)
  }

  static setCookie(username: string, cookie: string): string {
    this.jar.set(username, cookie)
    return cookie
  }
}
