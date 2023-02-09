# pip install mysql-connector-python



import mysql.connector

def parse_weather():
    with open('weather.xml') as f:
       my_lines = list(f)  
       s = ' '.join(my_lines)
       start=0
       for id in range(s.count('<Location>')):
              name=s[s.find('<LocationName>', start)+len('<LocationName>'):s.find('</LocationName>', start)]
              name="'"+name+"'"
              latitude=s[s.find('<LocationLatitude>', start)+len('<LocationLatitude>'):s.find('</LocationLatitude>', start)]
              latitude="'"+latitude+"'"
              longitude=s[s.find('<LocationLongitude>', start)+len('<LocationLongitude>'):s.find('</LocationLongitude>', start)]
              longitude="'"+longitude+"'"
              height=s[s.find('<LocationHeight>', start)+len('<LocationHeight>'):s.find('</LocationHeight>', start)]
              height="'"+height+"'"
              print("INSERT INTO `cities` (`id`, `name`, `latitude`, `longitude`, `height`) VALUES ('"+str(id)+"', "+name+", "+latitude+", "+longitude+", "+height+");")
              
              send_to_mysql(name, latitude, longitude, height)

              start=s.find('</LocationHeight>', start)+5


def send_to_mysql(name, latitude, longitude, height):
    import mysql.connector

    # 194.182.191.199
    # root
    # dkflsgklfds89lkzHGFDSBJKL7bhksjJKJKFYUO983hj
    # 3306

    mydb = mysql.connector.connect(
            host="194.182.191.199",
            user="root",
            password="dkflsgklfds89lkzHGFDSBJKL7bhksjJKJKFYUO983hj",
            database="weather_codes"
            )

    print(mydb)

    mycursor = mydb.cursor()

    # prepared statement
    sql = "INSERT INTO `cities` (`name`, `latitude`, `longitude`, `height`) VALUES ( %s, %s, %s, %s )"
    val = (name, latitude, longitude, height)
    
    mycursor.execute(sql, val)

    mydb.commit()

    print(mycursor.rowcount, "record inserted.")



if __name__ == "__main__":
    pass
    parse_weather()



