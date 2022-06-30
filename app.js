
function AddPartition(){

    const ram = document.getElementById('ram');

    const node = document.createElement('div')
    const node1 = document.createElement('div');
    const partition_size = document.createTextNode('2 MB');

    node1.appendChild(partition_size);
    node.appendChild(node1);
    node.className = 'partition';

    ram.appendChild(node);
}


function UpdateType(id) {
    
    if(id == 'static') {
        document.getElementById('partitions').disabled = false;
        document.getElementById('part-size').disabled = false;
    }
    else if (id == 'dynamic') {
        document.getElementById('partitions').disabled = true;
        document.getElementById('part-size').disabled = true;

        document.getElementById('ram').innerHTML = '';
    }
}

function UpdateMemory(id) {

    ram_size = document.getElementById(id).value;
    document.getElementById('ram-size').innerHTML = ram_size + ' MB';

    let max_partition = ram_size / 2;

    document.getElementById('partitions')

}

function UpdatePartitions(id) {

    partitions = document.getElementById(id).value;
    document.getElementById('ram').innerHTML = '';
    for(i = 0; i < partitions; i++) {
        AddPartition();
    }
}


// function updatePartition(id)

    












// COMMENTED EXTRA CODE

    // const techniqueName = document.getElementById(id).id;
    // output.style.textAlign = "right";
    // alert(output.style.backgroundColor);
    // document.getElementsByClassName('output').innerHTML = 'asdsdasd';



