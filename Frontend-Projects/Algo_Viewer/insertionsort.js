function Insertion()
{
    
    document.getElementById("Time_Worst").innerText="O(N^2)";
    document.getElementById("Time_Average").innerText="O(N^2)";
    document.getElementById("Time_Best").innerText="O(N)";

    document.getElementById("Space_Worst").innerText="O(1)";

    c_delay=0;

    for(var j=0;j<array_size;j++)
    {
        div_update(divs[j],div_sizes[j],"yellow");

        var key= div_sizes[j];
        var i=j-1;
        while(i>=0 && div_sizes[i]>key)
        {
            div_update(divs[i],div_sizes[i],"red");
            div_update(divs[i+1],div_sizes[i+1],"red");

            div_sizes[i+1]=div_sizes[i];

            div_update(divs[i],div_sizes[i],"red");
            div_update(divs[i+1],div_sizes[i+1],"red");
    
            div_update(divs[i],div_sizes[i],"blue");
            if(i==(j-1))
            {
                div_update(divs[i+1],div_sizes[i+1],"yellow");
            }
            else
            {
                div_update(divs[i+1],div_sizes[i+1],"blue");
            }
            i-=1;
        }
        div_sizes[i+1]=key;

        for(var t=0;t<j;t++)
        {
            div_update(divs[t],div_sizes[t],"green");
        }
    }
    div_update(divs[j-1],div_sizes[j-1],"green");

    enable_buttons();
}