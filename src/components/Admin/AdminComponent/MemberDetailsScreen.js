import { View, Text, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function MemberDetailsScreen({ navigation, route }) {
  const { item } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        {item.image ? (
          <Image
            source={{ uri: `data:image/png;base64,${item.image}` }}
            style={{
              height: 150,
              width: 150,
              borderRadius: 100,
            }}
          />
        ) : (
          <FontAwesome name="user-circle" size={150} color="#73777B" />
        )}
      </View>
      <View style={{ alignItems: "center", marginTop: 13 }}>
        <View
          style={{
            backgroundColor: "#3CA2FA",
            width: 100,
            paddingTop: 5,
            paddingBottom: 5,
            alignItems: "center",
            borderRadius: 30,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              textTransform: "uppercase",
              color: "white",
            }}
          >
            {item.position}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "500",
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Member
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          height: 45,
          paddingLeft: 13,
          paddingRight: 13,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>Name</Text>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>{item.name}</Text>
      </View>
      <View
        style={{
          marginTop: 13,
          height: 45,
          paddingLeft: 13,
          paddingRight: 13,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>School Identification Number</Text>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>
          {item.school_identification_number}
        </Text>
      </View>
      <View
        style={{
          marginTop: 13,
          height: 45,
          paddingLeft: 13,
          paddingRight: 13,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>Email</Text>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>
          {item.email ? item.email : "Not set"}
        </Text>
      </View>
    </View>
  );
}
