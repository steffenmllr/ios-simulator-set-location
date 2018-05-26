import CoreLocation
import Foundation

private let kNotificationName = "com.apple.iphonesimulator.simulateLocation"

func postNotification(for coordinate: CLLocationCoordinate2D, to simulators: [String]) {
    let userInfo: [AnyHashable: Any] = [
        "simulateLocationLatitude": coordinate.latitude,
        "simulateLocationLongitude": coordinate.longitude,
        "simulateLocationDevices": simulators,
    ]
    let notification = Notification(name: Notification.Name(rawValue: kNotificationName), object: nil, userInfo: userInfo)
    DistributedNotificationCenter.default().post(notification)
}

// This should be better validated, since I'm only calling it from node it should be fine
let arguments = CommandLine.arguments
if 3 < arguments.count {
    let latitude = Double(CommandLine.arguments[1]) ?? 0.0
    let longitude = Double(CommandLine.arguments[2]) ?? 0.0
    let deviceIdString = CommandLine.arguments[3]

    let deviceIds = deviceIdString.components(separatedBy: ",")
    let location = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)

    postNotification(for: location, to:deviceIds)
    print("OK")

} else {
    print("Usage: `simulator-set-location lat lng deviceIds` (comma separated) - example `52.5243700 13.4105300 2FF61CF3-3973-426D-AA85-DF3A1960B3F7`")
    exit(EXIT_FAILURE)
}
