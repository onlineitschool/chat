with open('data.xml') as f:
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
              start=s.find('</LocationHeight>', start)+5