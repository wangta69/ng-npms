// 1either = 1^9 gwei = 1^18gwei
export function removeComma(val: number | string): number {
    if (val !== undefined && val !== null) {
      // here we just remove the commas from value
      return parseFloat(val.toString().replace(/,/g, ''));
    } else {
      return ;
    }
}

export function removeFromArrayByValue(arr: any[], v: any): any[] {
    const index = arr.indexOf(v);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

export function copyToClipboard(item: string): void {
    document.addEventListener('copy', (e: ClipboardEvent) => {
        e.clipboardData.setData('text/plain', (item));
        e.preventDefault();
        document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
}

export function navigatorLanguage(): string {
    const userLangtmp1 = navigator.language || (navigator as any).userLanguage;
    const userLangtmp2 = userLangtmp1.split('-');
    return userLangtmp2[0];
}
