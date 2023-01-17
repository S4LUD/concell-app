import { View, Text, FlatList, Image } from "react-native";
import { format } from "date-fns";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ScheduleContainerScreen({ navigation, route }) {
  const { item } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
      <View
        style={{
          padding: 13,
          backgroundColor: "white",
          marginTop: 13,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "#333333",
              textTransform: "capitalize",
            }}
          >
            {item.title}
          </Text>
          <Text style={{ fontSize: 11, color: "#73777B" }}>
            {format(new Date(item.createdAt), "MM/dd/yyyy")}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, marginTop: 13, color: "#333333" }}>
            {item.description}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={item.members}
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#EEF2F6",
              }}
            />
          )}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                  height: 45,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
                  paddingLeft: 13,
                  paddingRight: 13,
                }}
              >
                {item.image ? (
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 100,
                      resizeMode: "contain",
                    }}
                    source={{ uri: `data:image/png;base64,${item.image}` }}
                  />
                ) : (
                  <FontAwesome name="user-circle" size={30} color="#73777B" />
                )}
                <View
                  style={{
                    flex: 1,
                    marginLeft: 13,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 14,
                      color: "#333333",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  height: 45,
                  justifyContent: "center",
                  paddingLeft: 13,
                  paddingRight: 13,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#333333",
                  }}
                >
                  Participating member(s)
                </Text>
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  backgroundColor: "white",
                  height: 45,
                  paddingLeft: 13,
                  paddingRight: 13,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: "#73777B" }}>
                  Empty Members
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
