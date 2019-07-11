import { ifError } from "assert";
import { isContext } from "vm";

{uploads?setTimeout(()=>{ return (<CardImg src={previewImage} width="300px" height="300px"/>) },3000)
: (<h3 className="text-center">{message ? message : "Live Preview"}</h3>
)}

setTimeout(()=>{ return (<CardImg src={previewImage} width="300px" height="300px"/>) },300)

1. if => No image chosen - placeholder
2. else => image chosen ie images>0 - show preview
3. if isLoading is true && images >0, (loading in progress via submit api request), show loading icon
4. once loading is done, api success. isLoading is false, show placeholder.

if(isLoading==false){
        if(image=0){
            Show image loading placeholder.
        }
        else{
            Show preview image
        }
}
else{ //api call to submit has been made. in handle submit add setstate is loading:true. once api is susccessful, setstate to false
    show loading icon.
}

{!isLoading?(!imageFile?(<h3 className="text-center">{message ? message : "Live Preview"}</h3>):(<CardImg src={previewImage} width="300px" height="300px"/>)):<Loader/>}

<CardImg><Loader/></CardImg>