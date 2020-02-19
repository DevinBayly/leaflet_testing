
let stamen =()=> {
    let layer = new L.StamenTileLayer("toner")
    var mymap = new L.Map("mapid",{
        center: new L.LatLng(37,-122),
        zoom:5
    })
    mymap.addLayer(layer)
    // this part creates the tilelayer underneath so that we can actually see the map, not only the window
    return mymap
}
let legendBase = ()=> {
    let ob = {}
    ob.create =()=> {
        console.log("creating legend base");
        
        ob.legend = L.control({position:"bottomright"})
        // called when we use addTo
        ob.legend.onAdd = (map)=> {
            console.log("adding legend")
            let d = L.DomUtil.create('div','info legend'),
            grades = Array(20).fill(0).map((e,i)=> {
                return i*10
            }),
            labels =[]
            console.log(grades)
            for (let i =0;i < grades.length;i++) {
                d.innerHTML+= `<i style="background:rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255});"></i>text<br>`
            }
            return d
        }

    }
    return ob
}
//
let standard = (pos)=> {
    let mymap = new L.map('mapid').setView(pos,13)
    let layer  = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 2,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        // this requires getting a map box account by the way
        accessToken: 'pk.eyJ1IjoidHVjc29ubWFwdGltZSIsImEiOiJjazZ0dDlzdDAwMnF3M25xc3Y4OXZyMDN5In0.QWD_CRkng0_bz5I_-t4nXA'
    })
    mymap.addLayer(layer)
    return mymap
}

// markers
let markersBasic = ()=> {
    let ob = {}
    ob.collection =[]   
    // markers, m should be a [num,num]
    ob.includeMarker = (m)=> {
        ob.collection.push(L.marker(m))
    }
    // needs to be something that we can call addTo(mymap)
    ob.includeCircle = (c)=> {
        ob.collection.push(L.circle(c.latlng,c.config))
    }

    ob.markupPositions =()=> {
        for(let e of ob.collection) {
            e.addTo(ob.map)
        }
    }
    ob.markupMap =(L)=> {
        ob.map = L
    }
    return ob
}

let arrayMarkers = ()=> {
    let ob = {}
    ob.create = (center,number,scale)=> {
        ob.arrayMarkers = []
        for (let i =0;i< number;i++) {
            let angle = 2*Math.PI/number*i
            ob.arrayMarkers.push([center[0]+Math.cos(angle)*scale,center[1]+Math.sin(angle)*scale])
        }
    }
    ob.getMarkers =()=> {
        return ob.arrayMarkers
    }
    return ob
}
window.onload = () => {
    let pos = [51.89,1.4762]
    let am = arrayMarkers()
    am.create(pos,20,.1)
    console.log(am.getMarkers())
    let map = standard(pos)
    let markers = markersBasic()
    markers.markupMap(map)
    for (let m of am.getMarkers()){
        markers.includeMarker(m)
    }
    markers.markupPositions()
    let leg = legendBase()
    leg.create()
    console.log(leg)
    leg.legend.addTo(map)



}