export class Utils {
    getRemaingTime(totalSize: number, totalDone: number, DownSpeed: number, info_hash: string): string {


        try {
            let notDone = totalSize - totalDone;
            let HowManySeconds = notDone / DownSpeed;
            let date = new Date(null);
            date.setSeconds(Number.isNaN(HowManySeconds) || !Number.isFinite(HowManySeconds) ? 0 : HowManySeconds); 
            let result = date.toISOString().substr(11, 8);
            return result;
        } catch (ex) {
            throw ex;
        }

    }
}